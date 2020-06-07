export const HIDE_MODAL_ACTION = 'modal:HIDE_MODAL_ACTION';
export const SHOW_CONFIRMATION_MODAL_ACTION =
  'modal:SHOW_CONFIRMATION_MODAL_ACTION';

export interface ModalState {
  readonly show: boolean;
  readonly title?: string;
  readonly description?: string;
  readonly confirmButtonText?: string;
  readonly cancelButtonText?: string;
  readonly showCancelButton?: boolean;
  readonly onClickConfirm?: () => void;
  readonly onClickCancel?: () => void;
}

// Hide modal
export type HideModalPayload = {
  show: boolean;
};

export interface HideModalAction {
  type: typeof HIDE_MODAL_ACTION;
  payload: HideModalPayload;
}

// Show confirmation modal
export interface ShowConfirmationModalProps {
  readonly title?: string;
  readonly description?: string;
  readonly confirmButtonText?: string;
  readonly cancelButtonText?: string;
  readonly onClickConfirm?: () => void;
  readonly onClickCancel?: () => void;
}

export type ShowConfirmationModalPayload = ShowConfirmationModalProps & {
  show: boolean;
  showCancelButton: boolean;
};

export interface ShowConfirmationModalAction {
  type: typeof SHOW_CONFIRMATION_MODAL_ACTION;
  payload: ShowConfirmationModalPayload;
}

// Action Types
export type ModalReducerActionTypes =
  | HideModalAction
  | ShowConfirmationModalAction;

export type ModalReducer = (
  state: ModalState,
  action: ModalReducerActionTypes,
) => ModalState;
