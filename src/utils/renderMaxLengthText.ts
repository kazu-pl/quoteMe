const renderMaxLengthText = (text: string, maxLength?: number) => {
  const max = maxLength || 20;

  if (max <= 3) {
    return text;
  }

  return text.length >= max - 3 ? `${text.slice(0, max - 1)}...` : text;
};

export default renderMaxLengthText;
