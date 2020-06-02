import { renderHook, act } from '@testing-library/react-hooks';
import useI18n from './index';

test('must have labels', () => {
  const { result } = renderHook(() => useI18n());
  expect(result.current.labels).toBeDefined();
});

test('get current language', () => {
  const { result } = renderHook(() => useI18n());
  expect(result.current.language).toBe(result.current.languages.EN);
});

test('able to set language', () => {
  const { result } = renderHook(() => useI18n());

  act(() => {
    result.current.setLanguage(result.current.languages.PT);
  });
  expect(result.current.language).toBe(result.current.languages.PT);
});

test('get text by label', () => {
  const { result } = renderHook(() => useI18n());
  expect(result.current.text(result.current.labels.loading)).toBe('CARREGANDO');
});

test('update language and get updated text data', () => {
  const { result } = renderHook(() => useI18n());

  expect(result.current.text(result.current.labels.loading)).toBe('CARREGANDO');
  act(() => {
    result.current.setLanguage(result.current.languages.EN);
  });
  expect(result.current.text(result.current.labels.loading)).toBe('LOADING');
});
