export const migrationClient = String.raw`

      async function renderMigration(adminMode = false) {

        if (adminMode && !hasAdminAccess()) return renderAdminAccessRequired();

        const header = pageHeader('Migration', 'Apply to join server 881. Your answers are saved and shared with leadership.',

          hasAdminAccess() ? '<button class="secondary" data-link-button="' + (adminMode ? '/migration' : '/migration/admin') + '">' + (adminMode ? 'Application form' : 'View Applications') + '</button>' : '');

        app.innerHTML = header + '<p>Loading...</p>';

        try {

          if (adminMode) {

            const status = new URLSearchParams(location.search).get('status') || '';

            const page = Math.max(1,Number(new URLSearchParams(location.search).get('page')) || 1);

            const data = await fetchJson('/api/migration?status=' + encodeURIComponent(status) + '&page=' + page, true);

            app.innerHTML = header + '<label>Status <select id="migration-filter"><option value="">All</option>' + ['Pending','Reviewing','Accepted','Declined'].map(function(s){return '<option' + (s===status?' selected':'') + '>' + s + '</option>';}).join('') + '</select></label><p>' + data.total + ' applications</p><div id="migration-list"></div><div id="migration-pages"></div>';

            document.getElementById('migration-filter').onchange = function(e){navigate('/migration/admin?status='+encodeURIComponent(e.target.value));};

            const list = document.getElementById('migration-list');

            list.innerHTML='<style>.migration-table-wrap{overflow:auto;max-height:440px;border:1px solid #8c7445;border-radius:8px}.migration-table{border-collapse:collapse;min-width:100%;font-size:13px}.migration-table th{position:sticky;top:0;background:#29251e!important;color:#f5d994!important;z-index:2}.migration-table td,.migration-table th{padding:10px 12px;white-space:nowrap;border-bottom:1px solid #61543a;max-width:220px;overflow:hidden;text-overflow:ellipsis}.migration-table tbody tr{cursor:pointer}.migration-table tbody tr:focus{outline:2px solid #f4c85b;outline-offset:-2px}.migration-table .selected td{background:#5c471e!important;color:#fff2bf!important;box-shadow:inset 0 2px #e8bc57,inset 0 -2px #e8bc57}.migration-table td:first-child,.migration-table th:first-child{position:sticky;left:0;background:#28241d!important;color:#f9e5b2!important;z-index:1}.migration-table th:first-child{z-index:3}.migration-table .selected td:first-child{background:#795a22!important}.migration-details{margin-top:16px;padding:16px;border:2px solid #c9a256;border-radius:10px}.migration-answer-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:10px}.migration-answer-grid p{margin:0;padding:8px;overflow-wrap:anywhere;white-space:pre-wrap;border-bottom:1px solid #8c744533}</style><p>Click a player to highlight their row and review every answer below.</p><div class="migration-table-wrap"><table class="migration-table"><thead><tr></tr></thead><tbody></tbody></table></div><section class="migration-details" aria-live="polite"><p>Select an application to view details.</p></section>';

            const table=list.querySelector('table');const head=table.querySelector('thead tr');const body=table.querySelector('tbody');const detail=list.querySelector('.migration-details');

            const columns=[{key:'ign',label:'Player'},{key:'submitted',label:'Submitted'},{key:'status',label:'Status'},...((data.submissions[0]||{}).fields||[]).filter(function(f){return f.key!=='ign';})];

            columns.forEach(function(c){const th=document.createElement('th');th.scope='col';th.textContent=c.label;head.appendChild(th);});

            data.submissions.forEach(function(item){

              const row=document.createElement('tr');row.tabIndex=0;row.setAttribute('aria-selected','false');

              columns.forEach(function(c){const td=document.createElement('td');const value=c.key==='submitted'?new Date(item.createdAt).toLocaleString():c.key==='status'?item.status:item.answers[c.key];td.textContent=Array.isArray(value)?value.join(', '):String(value??'');td.title=td.textContent;row.appendChild(td);});

              function selectRow(){

                body.querySelectorAll('tr').forEach(function(r){r.classList.remove('selected');r.setAttribute('aria-selected','false');});row.classList.add('selected');row.setAttribute('aria-selected','true');

                detail.replaceChildren();const heading=document.createElement('h3');heading.textContent=item.answers.ign+' - '+item.answers.playerId;detail.appendChild(heading);

                const delivery=document.createElement('p');delivery.textContent='Discord: '+item.deliveryStatus+' - Requester: '+item.discordId;detail.appendChild(delivery);

                const grid=document.createElement('div');grid.className='migration-answer-grid';detail.appendChild(grid);

                (item.fields||[]).forEach(function(field){const p=document.createElement('p');const label=document.createElement('strong');label.textContent=field.label;const value=item.answers[field.key];p.appendChild(label);p.appendChild(document.createTextNode('\n'+(Array.isArray(value)?value.join(', ')||'None':value===0?'0':value||'Not provided')));grid.appendChild(p);});

                const select=document.createElement('select');['Pending','Reviewing','Accepted','Declined'].forEach(function(s){const o=new Option(s,s);o.selected=item.status===s;select.add(o);});select.setAttribute('aria-label','Application status');detail.appendChild(select);

                const save=document.createElement('button');save.className='primary';save.textContent='Save status';save.onclick=function(){withFeedback(save,async function(){await sendJson('PATCH','/api/migration/'+item._id,{status:select.value},true);item.status=select.value;row.children[2].textContent=item.status;},'Status updated');};detail.appendChild(save);

                if(item.deliveryStatus==='Failed'||item.deliveryStatus==='Pending'){const retry=document.createElement('button');retry.className='secondary';retry.textContent='Retry Discord delivery';retry.onclick=function(){withFeedback(retry,async function(){const result=await sendJson('POST','/api/migration/'+item._id+'/retry',{},true);item.deliveryStatus=result.submission.deliveryStatus;selectRow();},'Delivery checked');};detail.appendChild(retry);}

              }

              row.onclick=selectRow;row.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();selectRow();}};body.appendChild(row);

            });

            if(!data.submissions.length) detail.textContent='No applications yet.';

            const pages=document.getElementById('migration-pages');[page-1,page+1].filter(function(n){return n>0 && n<=Math.ceil(data.total/30);}).forEach(function(n){const b=document.createElement('button');b.textContent=n<page?'Previous':'Next';b.onclick=function(){navigate('/migration/admin?status='+encodeURIComponent(status)+'&page='+n);};pages.appendChild(b);});return;

          }

          const data=await fetchJson('/api/migration/fields');

          app.innerHTML=header+'<style>#migration-form .migration-section{background:#24211c!important;color:#f1e6cf!important;border-color:#6f5934!important}#migration-form label,#migration-form summary{color:#f1e6cf!important}#migration-form input,#migration-form textarea,#migration-form select{background:#171613!important;color:#fff0d2!important;border-color:#806b41!important}.migration-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px}.migration-choices{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:8px;max-height:240px;overflow:auto}.migration-choices label{display:flex;align-items:center;gap:8px}.migration-choices input{width:auto}.migration-section{margin-bottom:12px;padding:16px}.migration-section summary{cursor:pointer;font-weight:700;margin-bottom:12px}.migration-field{min-width:0}.migration-field input,.migration-field select,.migration-field textarea{max-width:100%;box-sizing:border-box}</style><form id="migration-form"><div id="migration-fields"></div><p id="migration-result" role="status"></p><button type="submit" class="primary">Submit application</button><p>Leadership will receive every answer. If you are signed in, your verified Discord identity is included.</p></form>';

          const groups={}; const form=document.getElementById('migration-form');

          data.fields.forEach(function(field){

            if(!groups[field.section]){const section=document.createElement('details');section.className='card migration-section';section.open=field.section==='Player';const title=document.createElement('summary');title.textContent=field.section;section.appendChild(title);const grid=document.createElement('div');grid.className='migration-grid';section.appendChild(grid);document.getElementById('migration-fields').appendChild(section);groups[field.section]=grid;}

            const wrapper=document.createElement('div');wrapper.className='migration-field';const label=document.createElement('label');label.textContent=field.label+(field.required?' *':'');label.htmlFor='migration-'+field.key;wrapper.appendChild(label);

            if(field.type==='multi') {const choices=document.createElement('div');choices.className='migration-choices';choices.setAttribute('role','group');choices.setAttribute('aria-label',field.label);field.options.forEach(function(option){const row=document.createElement('label');const input=document.createElement('input');input.type='checkbox';input.name=field.key;input.value=option;row.appendChild(input);row.appendChild(document.createTextNode(option));choices.appendChild(row);});wrapper.appendChild(choices);}

            else {const input=document.createElement(field.type==='textarea'?'textarea':field.type==='single'?'select':'input');input.id='migration-'+field.key;input.name=field.key;input.required=field.required;if(field.type==='single'){input.add(new Option('Select...',''));field.options.forEach(function(o){input.add(new Option(o,o));});}else if(field.type==='number'){input.type='number';input.min='0';input.max=String(Number.MAX_SAFE_INTEGER);input.step='any';}else{if(field.type!=='textarea') input.type='text';input.maxLength=field.type==='textarea'?2000:200;}wrapper.appendChild(input);}

            groups[field.section].appendChild(wrapper);

          });

          form.addEventListener('invalid',function(e){const section=e.target.closest('details');if(section)section.open=true;},true);

          let requestKey=crypto.randomUUID();

          form.onsubmit=async function(e){e.preventDefault();const button=form.querySelector('[type=submit]');const result=document.getElementById('migration-result');const values=new FormData(form);const answers={};for(const field of data.fields){answers[field.key]=field.type==='multi'?values.getAll(field.key):values.get(field.key)||'';if(field.required&&field.type==='multi'&&!answers[field.key].length){result.textContent='Choose at least one option for '+field.label;groups[field.section].parentElement.open=true;return;}}

            setLoading(button,true);try {const saved=await sendJson('POST','/api/migration',{requestKey,answers});result.textContent=saved.message+' Reference: '+saved.id;button.hidden=true;form.querySelectorAll('input,textarea,select').forEach(function(el){el.disabled=true;});}catch(error){result.textContent=error.message;}finally{setLoading(button,false);}

          };

        } catch(error){app.innerHTML=header+'<p>'+escapeHtml(error.message)+'</p>';}

      }

`;
