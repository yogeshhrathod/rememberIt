import { app, globalShortcut } from 'electron';

export const shortcutsConfig = [
  {
    keyCombination: 'CmdOrCtrl+Q',
    action: () => {
      app.quit();
    },
  },
  // Add more shortcuts here
];

export default function initShortcuts() {
  shortcutsConfig.forEach((shortcut) => {
    const registered = globalShortcut.register(
      shortcut.keyCombination,
      shortcut.action,
    );
    if (registered) {
      console.log('Shortcut registered successfully');
    } else {
      console.error('Shortcut registration failed');
    }
  });
}
