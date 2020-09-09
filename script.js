chrome.extension.onMessage.addListener(function (request) {
  const [tab, action] = request;
  if (action === 'action') {

    const backlogContainers = document.querySelectorAll('.ghx-backlog-container');
    const newestBacklog = backlogContainers[0];
    const sprintId = newestBacklog.querySelector('.ghx-name').innerText;
    const [startDate, endDate] = Array.from(newestBacklog.querySelectorAll('.ghx-date')).map(d => d.innerText);
    const backlogItems = Array.from(newestBacklog.querySelectorAll('.ghx-issue-content'))
      .map(issue => {
        const id = issue.querySelector('.ghx-key').innerText;
        const title = issue.querySelector('.ghx-summary').innerText;
        const point = issue.querySelector('.ghx-statistic-badge').innerText;
        return { id, title, point }
      });

    const toast = document.createElement('div');
    toast.style.zIndex = '999';
    toast.style.display = 'none';
    toast.style.position = 'fixed';
    toast.style.right = '40px';
    toast.style.top = '40px';
    toast.style.backgroundColor = '#00875a';
    toast.style.color = '#ffffff';
    toast.style.padding = '8px';
    toast.style.fontWeight = 'bold';
    toast.innerHTML = 'PBL Items Copied!';
    document.body.insertBefore(toast, document.body.firstChild);

    const obj = { sprintId, startDate, endDate, backlogItems };
    const lines = backlogItems.map(item => `${item.id}\t${item.title}\t${item.point}`);
    const txt = lines.join('\n\n\n');

    navigator.clipboard.writeText(txt)
      .then(() => {
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none',3000);
      });
  }
});
