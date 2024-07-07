import initFileOperations from './fileOperations';
import InitSqlOperations from './sql';

export default function initAPI() {
  initFileOperations();
  InitSqlOperations();
}
