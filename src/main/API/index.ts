import initFileOperations from './fileOperations';
import initShortcuts from './shortcuts';
import InitSqlOperations from './sql';

export default function initAPI() {
  initFileOperations();
  InitSqlOperations();
  initShortcuts();
}
