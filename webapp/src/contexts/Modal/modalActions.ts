import { ModalState } from './modalReducer';

export const SHOW_CONFIRMATION_MODAL_ACTION =
  'modal:SHOW_CONFIRMATION_MODAL_ACTION';

interface ShowConfirmationModalAction {
  type: typeof SHOW_CONFIRMATION_MODAL_ACTION;
  payload: ModalState;
}

export type ModalReducerActionTypes = ShowConfirmationModalAction;

export interface ShowConfirmationModalProps {
  readonly title?: string;
  readonly description?: string;
  readonly confirmButtonText?: string;
  readonly cancelButtonText?: string;
  readonly onClickConfirm?: () => void;
}

/**
 * Show confirmation modal
 */
export const showConfirmationModal = ({
  title = 'Title',
  description = 'Description',
  confirmButtonText = 'Yes',
  cancelButtonText = 'No',
  onClickConfirm = () => {},
}: ShowConfirmationModalProps): ShowConfirmationModalAction => {
  return {
    type: SHOW_CONFIRMATION_MODAL_ACTION,
    payload: {
      show: true,
      title,
      description,
      confirmButtonText,
      cancelButtonText,
      showCancelButton: true,
      onClickConfirm,
    },
  };
};
