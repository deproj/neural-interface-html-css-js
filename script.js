document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const interfaceEl = document.getElementById('interface');
  const terminalOutput = document.getElementById('terminalOutput');
  const input = document.getElementById('commandInput');
  const modal = document.getElementById('modal');
  const neuralUI = document.getElementById('neuralUI');
  const pulseRing = document.querySelector('.pulse-ring');
const terminalWindow = document.querySelector('.terminal-window');

const commands = {
  '/help': `Available commands:
• /system — Check core systems
• /scan — Perform diagnostic scan
• /open — Launch neural control panel
• /reboot — Restart modules
• /matrix — Activate Matrix mode
• /glitch — Apply visual distortion
• /modal — Open modal window
• /clear — Clear console
• /creator — Creator information`,

  '/system': 'Status: STABLE\nMemory: 83%\nPing: 2.4ms',
  '/scan': 'Running system scan...\n✔ No anomalies detected.\n✔ Data link secure.',
  '/open': 'Neural panel interface launching...',
  '/reboot': 'Restarting core modules...\n✔ Done. All systems reset.',
  '/matrix': 'Matrix mode: ENABLED',
  '/glitch': 'Glitch protocol initiated. Expect minor distortion.',
  '/modal': 'Opening modal interface...',
'/creator': `Interface by deproj<br>
Upwork: <a href="https://www.upwork.com/freelancers/~01352bbffb500934af" target="_blank">View Upwork Profile</a><br>
GitHub: <a href="https://github.com/deproj" target="_blank">Visit GitHub</a>`
};
  // intro
setTimeout(() => {
  intro.style.display = 'none';
  interfaceEl.classList.remove('hidden');
  logSystem('Neural Interface v2.1 online.');
  logSystem('Type /help to begin.');
}, 1500); // или 2000 — на твой вкус

  // type cmd
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';
      printCommand(cmd);
      handleCommand(cmd);
    }
  });

  function printCommand(cmd) {
    terminalOutput.innerHTML += `<div><span style="color:#0f0;">›</span> ${cmd}</div>`;
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
  }

  function logSystem(msg) {
    terminalOutput.innerHTML += `<div class="system">[System] ${msg}</div>`;
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
  }

  function logReply(msg) {
    terminalOutput.innerHTML += `<div class="reply">${msg.replace(/\n/g, '<br>')}</div>`;
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
  }

  function simulateLoading(callback) {
    const loader = document.createElement('div');
    loader.innerHTML = 'Processing<span class="dots">.</span>';
    terminalOutput.appendChild(loader);

    const dots = loader.querySelector('.dots');
    let i = 1;
    const interval = setInterval(() => {
      i = (i + 1) % 4;
      dots.textContent = '.'.repeat(i || 1);
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      loader.remove();
      callback();
    }, 1000);
  }

  function handleCommand(cmd) {
    if (cmd === '/clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const reply = commands[cmd];
    if (reply) {
      simulateLoading(() => {
        logReply(reply);
        triggerEffect(cmd);
      });
    } else {
      logReply(`Unknown command: "${cmd}"<br>Type /help to see available commands.`);
    }
  }

  function triggerEffect(cmd) {
    switch (cmd) {
      case '/modal':
        modal.classList.remove('hidden');
        break;

      case '/glitch':
        document.body.classList.add('glitching');
        setTimeout(() => document.body.classList.remove('glitching'), 1500);
        break;

      case '/matrix':
        document.body.classList.add('matrix-mode');
        setTimeout(() => document.body.classList.remove('matrix-mode'), 4000);
        break;

      case '/open':
        interfaceEl.classList.add('hidden');
        neuralUI.classList.remove('hidden');
        break;
    }
  }

  // global buttons
  window.returnToTerminal = () => {
    neuralUI.classList.add('hidden');
    interfaceEl.classList.remove('hidden');
  };

  window.closeModal = () => {
    modal.classList.add('hidden');
  };
});