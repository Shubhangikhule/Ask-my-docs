import jsPDF from "jspdf";

export function exportAsPDF(title, messages) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text(title, 10, y);

  y += 12;

  doc.setFontSize(12);

  messages.forEach((message) => {
    const sender = message.sender === "user" ? "You" : "AI";

    const lines = doc.splitTextToSize(
      `${sender}: ${message.text}`,
      180
    );

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(lines, 10, y);

    y += lines.length * 7 + 6;
  });

  doc.save(`${title}.pdf`);
}

export function exportAsMarkdown(title, messages) {
  let markdown = `# ${title}\n\n`;

  messages.forEach((message) => {
    markdown += `## ${message.sender === "user" ? "You" : "AI"}\n\n`;
    markdown += `${message.text}\n\n`;
  });

  const blob = new Blob([markdown], {
    type: "text/markdown",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${title}.md`;

  link.click();

  URL.revokeObjectURL(url);
}

export function exportAsText(title, messages) {
  let text = `${title}\n\n`;

  messages.forEach((message) => {
    text += `${message.sender === "user" ? "You" : "AI"}\n`;
    text += `${message.text}\n\n`;
  });

  const blob = new Blob([text], {
    type: "text/plain",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${title}.txt`;

  link.click();

  URL.revokeObjectURL(url);
}