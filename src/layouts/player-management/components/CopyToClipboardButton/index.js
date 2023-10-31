import { useState } from 'react';
import MDButton from 'components/MDButton';

function CopyToClipboardButton({ text }) {
    const [isCopied, setIsCopied] = useState(false);
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
    };
  
    return (
        <MDButton onClick={copyToClipboard} variant='gradient' color={isCopied ? 'success' : 'info'}>
            {isCopied ? 'Copied!' : 'Copy to clipboard'}
        </MDButton>
    );
  }

export default CopyToClipboardButton;