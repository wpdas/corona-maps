import {
  HideModalAction,
  ShowConfirmationModalProps,
  ShowConfirmationModalAction,
  SHOW_CONFIRMATION_MODAL_ACTION,
  HIDE_MODAL_ACTION,
} from './modalTypes';

/**
 * Hide modal
 */
export const hideModal = (): HideModalAction => {
  return {
    type: HIDE_MODAL_ACTION,
    payload: {
      show: false,
    },
  };
};

/**
 * Show confirmation modal
 */
export const showConfirmationModal = ({
  title = 'Title',
  description = 'Description',
  confirmButtonText = 'Yes',
  cancelButtonText = 'No',
  onClickConfirm = () => {},
  onClickCancel = () => {},
}: ShowConfirmationModalProps): ShowConfirmationModalAction => {
  return {
    type: SHOW_CONFIRMATION_MODAL_ACTION,
    payload: {
      show: true,
      showCancelButton: true,
      title,
      description,
      confirmButtonText,
      cancelButtonText,
      onClickConfirm,
      onClickCancel,
    },
  };
};
