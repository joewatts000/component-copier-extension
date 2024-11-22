chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.tabs.sendMessage(tab.id, { action: 'togglePicker' });
  } catch (error) {
    console.log('Error sending message:', error);

    if (error.message.includes('Receiving end does not exist')) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
      });

      await chrome.tabs.sendMessage(tab.id, { action: 'togglePicker' });
    }
  }
});
