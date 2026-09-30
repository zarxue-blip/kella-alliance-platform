(() => {
  const page = document.querySelector("[data-payment-stage]");
  const feedback = document.getElementById("kingdom-payment-check-state");
  if (!page || !feedback) return;

  let timer;
  let checking = false;
  let stopped = false;
  let failures = 0;

  function schedule(delay = 5000) {
    clearTimeout(timer);
    if (!stopped && document.visibilityState === "visible") {
      timer = setTimeout(checkAccess, delay);
    }
  }

  async function checkAccess() {
    if (checking || stopped || document.visibilityState !== "visible") return;
    checking = true;
    try {
      const response = await fetch("/api/auth/kofi/status", {
        credentials: "same-origin",
        cache: "no-store",
        headers: { Accept: "application/json" }
      });
      const result = await response.json();
      if (!result || typeof result.status !== "string") throw new Error("Invalid status");
      if (result.status === "approved") {
        stopped = true;
        window.location.replace("/kingdom/payment");
        return;
      }
      if (result.status === "expired") {
        stopped = true;
        feedback.textContent = "Your sign-in expired. Please log in again to check your payment.";
        return;
      }
      if (!response.ok) throw new Error("Unable to check access");
      const nextStage = result.status === "review-pending" ? "review"
        : result.status === "approval-pending" ? "approval"
          : result.status === "payment-required" ? "payment" : null;
      if (nextStage && nextStage !== page.dataset.paymentStage) {
        stopped = true;
        window.location.reload();
        return;
      }
      failures = 0;
      feedback.textContent = "";
      schedule();
    } catch {
      failures += 1;
      feedback.textContent = "Could not check access right now. Use Check access to try again.";
      schedule(failures >= 3 ? 30000 : 10000);
    } finally {
      checking = false;
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") schedule(1000);
    else clearTimeout(timer);
  });
  window.addEventListener("focus", () => schedule(1000));
  schedule();
})();
