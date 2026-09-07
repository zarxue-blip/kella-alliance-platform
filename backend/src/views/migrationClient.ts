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

            app.innerHTML = header + '<div class="migration-export"><button class="primary" type="button" id="migration-export">Download all applications (CSV)</button><span>Includes every applicant and all answers, across all pages and statuses.</span></div><label>Status <select id="migration-filter"><option value="">All</option>' + ['Pending','Reviewing','Accepted','Declined'].map(function(s){return '<option' + (s===status?' selected':'') + '>' + s + '</option>';}).join('') + '</select></label><p>' + data.total + ' applications</p><div id="migration-list"></div><div id="migration-pages"></div>';

            const exportButton=document.getElementById('migration-export');
            exportButton.onclick=function(){withFeedback(exportButton,async function(){
              const response=await fetch('/api/migration/export.csv',{credentials:'same-origin',headers:{...requestHeaders(false),accept:'text/csv'}});
              if(!response.ok){await parseResponse(response);return;}
              const url=URL.createObjectURL(await response.blob());
              const link=document.createElement('a');link.href=url;link.download='migration-applications-'+new Date().toISOString().slice(0,10)+'.csv';
              document.body.appendChild(link);link.click();link.remove();setTimeout(function(){URL.revokeObjectURL(url);},60000);
            },'Applications downloaded');};

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

                const delivery=document.createElement('p');delivery.textContent='Discord: '+item.deliveryStatus+' - Roles: '+(item.roleStatus||'Not processed')+' - Requester: '+(item.discordId||'Not linked');detail.appendChild(delivery);

                const grid=document.createElement('div');grid.className='migration-answer-grid';detail.appendChild(grid);

                (item.fields||[]).forEach(function(field){const p=document.createElement('p');const label=document.createElement('strong');label.textContent=field.label;const value=item.answers[field.key];p.appendChild(label);p.appendChild(document.createTextNode('\n'+(Array.isArray(value)?value.join(', ')||'None':value===0?'0':value||'Not provided')));grid.appendChild(p);});

                const select=document.createElement('select');['Pending','Reviewing','Accepted','Declined'].forEach(function(s){const o=new Option(s,s);o.selected=item.status===s;select.add(o);});select.setAttribute('aria-label','Application status');detail.appendChild(select);

                const save=document.createElement('button');save.className='primary';save.textContent='Save status';save.onclick=function(){withFeedback(save,async function(){await sendJson('PATCH','/api/migration/'+item._id,{status:select.value},true);item.status=select.value;row.children[2].textContent=item.status;},'Status updated');};detail.appendChild(save);

                const remove=document.createElement('button');remove.className='danger';remove.textContent='Delete application';remove.onclick=function(){
                  if(!window.confirm('Permanently delete the application for '+item.answers.ign+' ('+item.answers.playerId+')? This cannot be undone. Existing Discord messages and roles will remain.')) return;
                  withFeedback(remove,async function(){
                    await sendJson('DELETE','/api/migration/'+item._id,{},true);
                    const remaining=data.total-1;
                    const nextPage=Math.min(page,Math.max(1,Math.ceil(remaining/30)));
                    navigate('/migration/admin?status='+encodeURIComponent(status)+'&page='+nextPage);
                  },'Application deleted');
                };detail.appendChild(remove);

                if(item.deliveryStatus==='Failed'||item.deliveryStatus==='Pending'||item.roleStatus==='Failed'){const retry=document.createElement('button');retry.className='secondary';retry.textContent='Retry Discord / roles';retry.onclick=function(){withFeedback(retry,async function(){const result=await sendJson('POST','/api/migration/'+item._id+'/retry',{},true);item.deliveryStatus=result.submission.deliveryStatus;item.roleStatus=result.submission.roleStatus;selectRow();},'Delivery checked');};detail.appendChild(retry);}

              }

              row.onclick=selectRow;row.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();selectRow();}};body.appendChild(row);

            });

            if(!data.submissions.length) detail.textContent='No applications yet.';

            const pages=document.getElementById('migration-pages');[page-1,page+1].filter(function(n){return n>0 && n<=Math.ceil(data.total/30);}).forEach(function(n){const b=document.createElement('button');b.textContent=n<page?'Previous':'Next';b.onclick=function(){navigate('/migration/admin?status='+encodeURIComponent(status)+'&page='+n);};pages.appendChild(b);});return;

          }

          const identity=await fetchJson('/api/migration/identity');
          const linkedDiscord=identity.discordId || state.auth?.user?.discordId;
          const data=await fetchJson('/api/migration/fields');

          app.innerHTML=header+'<style>#migration-form .migration-section{background:#24211c!important;color:#f1e6cf!important;border-color:#6f5934!important}#migration-form label,#migration-form summary{color:#f1e6cf!important}#migration-form input,#migration-form textarea,#migration-form select{background:#171613!important;color:#fff0d2!important;border-color:#806b41!important}.migration-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px}.migration-choices{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:8px;max-height:240px;overflow:auto}.migration-choices label{display:flex;align-items:center;gap:8px}.migration-choices input{width:auto}.migration-section{margin-bottom:12px;padding:16px}.migration-section summary{cursor:pointer;font-weight:700;margin-bottom:12px}.migration-field{min-width:0}.migration-field input,.migration-field select,.migration-field textarea{max-width:100%;box-sizing:border-box}</style><form id="migration-form"><p id="migration-discord-link"></p><div id="migration-fields"></div><p id="migration-result" role="status"></p><button type="submit" class="primary">Submit application</button><p>Leadership will receive every answer. If you are signed in, your verified Discord identity is included.</p></form>';

          const groups={}; const form=document.getElementById('migration-form');

          data.fields.forEach(function(field){

            if(!groups[field.section]){const section=document.createElement('details');section.className='card migration-section';section.open=field.section==='Player';const title=document.createElement('summary');title.textContent=field.section;section.appendChild(title);const grid=document.createElement('div');grid.className='migration-grid';section.appendChild(grid);document.getElementById('migration-fields').appendChild(section);groups[field.section]=grid;}

            const wrapper=document.createElement('div');wrapper.className='migration-field';const label=document.createElement('label');label.textContent=field.label+(field.required?' *':'');label.htmlFor='migration-'+field.key;wrapper.appendChild(label);

            if(field.type==='multi') {const choices=document.createElement('div');choices.className='migration-choices';choices.setAttribute('role','group');choices.setAttribute('aria-label',field.label);field.options.forEach(function(option){const row=document.createElement('label');const input=document.createElement('input');input.type='checkbox';input.name=field.key;input.value=option;row.appendChild(input);row.appendChild(document.createTextNode(option));choices.appendChild(row);});wrapper.appendChild(choices);}

            else {const input=document.createElement(field.type==='textarea'?'textarea':field.type==='single'?'select':'input');input.id='migration-'+field.key;input.name=field.key;input.required=field.required;if(field.type==='single'){input.add(new Option('Select an option',''));field.options.forEach(function(o){input.add(new Option(o,o));});}else if(field.type==='number'){input.type='number';input.min='0';input.max=String(Number.MAX_SAFE_INTEGER);input.step='any';}else{if(field.type!=='textarea') input.type='text';input.maxLength=field.type==='textarea'?2000:200;}wrapper.appendChild(input);}

            groups[field.section].appendChild(wrapper);

          });

          form.addEventListener('invalid',function(e){const section=e.target.closest('details');if(section)section.open=true;},true);

          const discordLink=document.getElementById('migration-discord-link');
          function connectDiscord(){location.href='/api/auth/discord?migration=1';}
          if(linkedDiscord){discordLink.textContent='Discord connected. Your applicant roles will be assigned after submission.';}
          else {discordLink.textContent='Connect Discord to receive your applicant roles. ';const connect=document.createElement('button');connect.type='button';connect.className='secondary';connect.textContent='Connect Discord';connect.onclick=connectDiscord;discordLink.appendChild(connect);}
          let requestKey=crypto.randomUUID();
          function showThanks(saved){
            const dialog=document.createElement('dialog');dialog.style.cssText='max-width:420px;width:calc(100% - 48px);border:1px solid #c9a256;border-radius:14px;padding:24px;background:#24211c;color:#f1e6cf';
            dialog.setAttribute('aria-labelledby','migration-thanks-title');
            const title=document.createElement('h2');title.id='migration-thanks-title';title.textContent='Thank you for applying!';title.style.color='#f1d18a';dialog.appendChild(title);
            const message=document.createElement('p');message.textContent='Your server 881 application is received. Our review team will be in touch.';dialog.appendChild(message);
            const roles=document.createElement('p');roles.textContent=saved.roleStatus==='Assigned'?'Both Discord applicant roles have been assigned.':saved.roleStatus==='NeedsDiscord'?'Connect Discord to receive your applicant roles.':saved.roleError||'';dialog.appendChild(roles);
            if(saved.roleStatus==='NeedsDiscord'){const connect=document.createElement('button');connect.className='primary';connect.textContent='Connect Discord';connect.onclick=connectDiscord;dialog.appendChild(connect);}
            const join=document.createElement('a');join.className='primary';join.href='https://discord.gg/QmzkgQgQe';join.target='_blank';join.rel='noopener noreferrer';join.textContent='Join Discord';dialog.appendChild(join);
            const close=document.createElement('button');close.className='secondary';close.textContent='Done';close.onclick=function(){dialog.close();};dialog.appendChild(close);dialog.onclose=function(){dialog.remove();};document.body.appendChild(dialog);dialog.showModal();
          }
          const draftKey='kella-migration-draft';
          try {const draft=JSON.parse(sessionStorage.getItem(draftKey)||'null');if(draft){requestKey=draft.requestKey||requestKey;data.fields.forEach(function(field){const value=draft.answers[field.key];form.querySelectorAll('[name="'+field.key+'"]').forEach(function(input){if(input.type==='checkbox')input.checked=Array.isArray(value)&&value.includes(input.value);else input.value=value??'';});});}}catch{}
          form.addEventListener('input',function(){const values=new FormData(form);const answers={};data.fields.forEach(function(f){answers[f.key]=f.type==='multi'?values.getAll(f.key):values.get(f.key)||'';});sessionStorage.setItem(draftKey,JSON.stringify({requestKey,answers}));});
          const receipt=sessionStorage.getItem('kella-migration-receipt');
          if(identity.discordId && receipt){try{const roles=await sendJson('POST','/api/migration/connect-discord',{requestKey:receipt});sessionStorage.removeItem('kella-migration-receipt');form.querySelector('[type=submit]').hidden=true;showThanks(roles);}catch(error){document.getElementById('migration-result').textContent=error.message;}}


          form.onsubmit=async function(e){e.preventDefault();const button=form.querySelector('[type=submit]');const result=document.getElementById('migration-result');const values=new FormData(form);const answers={};for(const field of data.fields){answers[field.key]=field.type==='multi'?values.getAll(field.key):values.get(field.key)||'';if(field.required&&field.type==='multi'&&!answers[field.key].length){result.textContent='Choose at least one option for '+field.label;groups[field.section].parentElement.open=true;return;}}

            setLoading(button,true);try {const saved=await sendJson('POST','/api/migration',{requestKey,answers});result.textContent=saved.message+' Reference: '+saved.id;sessionStorage.removeItem(draftKey);if(saved.roleStatus==='NeedsDiscord')sessionStorage.setItem('kella-migration-receipt',requestKey);showThanks(saved);button.hidden=true;form.querySelectorAll('input,textarea,select').forEach(function(el){el.disabled=true;});}catch(error){result.textContent=error.message;}finally{setLoading(button,false);}

          };

        } catch(error){app.innerHTML=header+'<p>'+escapeHtml(error.message)+'</p>';}

      }

`;
