import {
  ModalReducerActionTypes,
  ShowConfirmationModalProps,
  SHOW_CONFIRMATION_MODAL_ACTION,
} from './modalActions';

export interface ModalState {
  readonly show: Boolean;
  readonly title?: string;
  readonly description?: string;
  readonly confirmButtonText?: string;
  readonly cancelButtonText?: string;
  readonly showCancelButton?: Boolean;
  readonly onClickConfirm?: () => void;
}

type ModalReducer = (
  state: ModalState,
  action: ModalReducerActionTypes,
) => ModalState;

export const initialState: ModalState = {
  show: false,
  title: 'Title',
  description: 'Description',
  confirmButtonText: 'Yes',
  cancelButtonText: 'No',
  showCancelButton: false,
  onClickConfirm: () => {},
};

const shoConfirmationwModalCase = (
  state: ModalState,
  payload: ShowConfirmationModalProps,
) => {
  const {
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    onClickConfirm,
  } = payload;
  console.log('Ma oew:', payload);
  return {
    ...state,
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    onClickConfirm,
  };
};

const modalReducer: ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFIRMATION_MODAL_ACTION:
      return shoConfirmationwModalCase(state, action.payload);
    default:
      return state;
  }
};

export default modalReducer;
