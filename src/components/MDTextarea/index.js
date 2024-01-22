// MDTextarea.js
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';

const MDTextareaRoot = styled(TextareaAutosize)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { error, success, disabled } = ownerState;

  const { grey, transparent, error: colorError, success: colorSuccess } = palette;
  const { pxToRem } = functions;

  const errorStyles = () => ({
    border: `1px solid ${colorError.main}`,
    '&:focus': {
      outline: `2px solid ${colorError.main}`
    },
    color: colorError.main
  });

  const successStyles = () => ({
    border: `1px solid ${colorSuccess.main}`,
    '&:focus': {
      outline: `2px solid ${colorSuccess.main}`
    },
    color: colorSuccess.main
  });

  return {
    backgroundColor: disabled ? `${grey[200]} !important` : transparent.main,
    color: palette.text.main,
    pointerEvents: disabled ? 'none' : 'auto',
    resize: 'vertical',
    padding: pxToRem(12),
    ...(error && errorStyles()),
    ...(success && successStyles())
  };
});

const MDTextarea = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MDTextareaRoot
    aria-label='empty textarea'
    minRows={3}
    ref={ref}
    ownerState={{ error, success, disabled }}
    {...rest}
  />
));

MDTextarea.defaultProps = {
  error: false,
  success: false,
  disabled: false
};

MDTextarea.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool
};

export default MDTextarea;
