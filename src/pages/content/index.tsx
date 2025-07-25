import { createRoot } from 'react-dom/client';
import Display from './components/Display';
import './style.css';

if (!document.querySelector("#__root")) {
  const div = document.createElement('div');
  div.id = '__root';
  document.body.appendChild(div);
}

const rootContainer = document.querySelector('#__root');

if (!rootContainer) throw new Error("Can't find Content root element");

const root = createRoot(rootContainer);
root.render(
  <Display />
);

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}