import React from 'react';

import { Palette } from './Palette';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';

import './index.css';

function DiagramApp() {
  return (
    <div className="app">
      <Palette />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}

export default DiagramApp;
