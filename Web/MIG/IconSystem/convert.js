const {items, sections} = require('./items');
const fs = require('fs');

const remap = {
  '3d': '_3d',
  '???': 'qqq'
};

for (const item in items) {
  const i = items[item];
  const row = (Math.floor(i.pos / 32)) - 1;
  const column = Math.floor(i.pos % 32) - 1;
  
}