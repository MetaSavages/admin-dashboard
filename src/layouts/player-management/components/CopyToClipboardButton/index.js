import { useState } from 'react';
import MDButton from 'components/MDButton';

function CopyToClipboardButton({ text }) {
    const [isCopied, setIsCopied] = useState(false);
  
    const copyToClipboard = () => {
      const textField = document.createElement('textarea');
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
      setIsCopied(true);
    };
  
    return (
        <MDButton onClick={copyToClipboard} variant='gradient' color={isCopied ? 'success' : 'info'}>
            {isCopied ? 'Copied!' : 'Copy'}
        </MDButton>
    );
  }

export default CopyToClipboardButton;