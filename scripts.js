/**
 * scripts.js — CNR Study Abroad
 * Global interactive behaviours
 */

// FAQ Accordion
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// Form validation & success feedback
function initForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:40px 20px;">
            <div style="font-size:3rem;margin-bottom:16px;">✅</div>
            <h3 style="color:var(--navy);margin-bottom:10px;">Message Received!</h3>
            <p>Thank you for reaching out. Our counsellor will contact you within 24 hours.</p>
            <a href="https://wa.me/918500199988?text=Hi%20CNR%2C%20I%20want%20a%20free%20consultation." 
               class="btn btn-wa" style="margin-top:24px;display:inline-flex;" target="_blank">
              💬 Or WhatsApp Us Now
            </a>
          </div>`;
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.disabled = false;
      alert('Something went wrong. Please WhatsApp us directly at +91 85001 99988.');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initForm();
});
