document.addEventListener("DOMContentLoaded", () => {
  // Accordion functionality
  const accordionTriggers = document.querySelectorAll("[data-accordion-trigger]")

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-accordion-trigger")
      const content = document.querySelector(`[data-accordion-content="${targetId}"]`)

      const isOpen = trigger.getAttribute("data-state") === "open"

      // Toggle the current accordion
      if (isOpen) {
        trigger.setAttribute("data-state", "closed")
        content.setAttribute("data-state", "closed")
      } else {
        trigger.setAttribute("data-state", "open")
        content.setAttribute("data-state", "open")
      }
    })
  })

  // Mobile navigation toggle (if needed)
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("hidden")

      if (isOpen) {
        mobileMenu.classList.remove("hidden")
      } else {
        mobileMenu.classList.add("hidden")
      }
    })
  }

  // Form submission handling
  const contactForm = document.querySelector("form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const firstName = contactForm.querySelector('input[placeholder="First Name"]').value
      const lastName = contactForm.querySelector('input[placeholder="Last Name"]').value
      const email = contactForm.querySelector('input[placeholder="Email"]').value
      const message = contactForm.querySelector("textarea").value

      // Simple validation
      if (!firstName || !lastName || !email || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the data to a server
      console.log("Form submitted:", { firstName, lastName, email, message })

      // Reset form
      contactForm.reset()

      // Show success message
      alert("Thank you for your message! We will get back to you soon.")
    })
  }
})

function analyzeLink() {
  const urlInput = document.getElementById('linkInput').value;
  const resultArea = document.getElementById('resultArea');
  
  if (!urlInput) {
    resultArea.innerHTML = 'Please enter a URL to analyze.';
    return;
  }

  resultArea.innerHTML = 'Analyzing...';
  
  setTimeout(() => {
    const isSafe = Math.random() > 0.3;
    if (isSafe) {
      resultArea.innerHTML = `
        <span class="text-emerald-500">✓ Safe Link</span><br>
        The URL "${urlInput}" appears to be safe. No malicious patterns detected.
      `;
    } else {
      resultArea.innerHTML = `
        <span class="text-red-500">⚠ Potential Threat</span><br>
        The URL "${urlInput}" shows signs of potential phishing or malicious content.
      `;
    }
  }, 1000);
}

let demoInterval;
function startThreatDemo() {
  const threatLog = document.getElementById('threatLog');
  const button = document.getElementById('threatDemoButton');
  
  if (demoInterval) {
    clearInterval(demoInterval);
    demoInterval = null;
    button.textContent = 'Start Threat Detection Demo';
    threatLog.innerHTML = '';
    return;
  }

  button.textContent = 'Stop Demo';
  const threats = [
    'Phishing attempt detected',
    'Malicious redirect blocked',
    'Suspicious download prevented',
    'Safe link verified',
    'Potential malware link flagged'
  ];

  demoInterval = setInterval(() => {
    const randomThreat = threats[Math.floor(Math.random() * threats.length)];
    const timestamp = new Date().toLocaleTimeString();
    const isThreat = randomThreat.includes('detected') || randomThreat.includes('blocked') || randomThreat.includes('flagged');
    const logEntry = `
      <div class="mb-2">
        [${timestamp}] 
        <span class="${isThreat ? 'text-red-500' : 'text-emerald-500'}">
          ${randomThreat}
        </span>
      </div>
    `;
    threatLog.innerHTML = logEntry + threatLog.innerHTML;
  }, 2000);
}