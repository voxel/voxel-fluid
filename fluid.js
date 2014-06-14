'use strict';

var ucfirst = require('ucfirst');

module.exports = function(game, opts) {
  return new FluidPlugin(game, opts);
};

function FluidPlugin(game, opts) {

  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-fluid requires voxel-registry plugin');

  this.fluids = [];

  this.registerFluid('water');
  this.registerFluid('lava');

  this.enable();
}

FluidPlugin.prototype.enable = function() {
  // TODO: add tick handler to spread, see voxel-virus
};

FluidPlugin.prototype.disable = function() {
};

FluidPlugin.prototype.registerFluid = function(name) {
  var still = this.registry.registerBlock(name, {
    texture: name + '_still',
    // cube - custom model causes 2nd phase render
    blockModel: [
      {from: [0,0,0],
      to: [16,16,16],
      faceData: {
          down: {},
          up: {},
          north: {},
          south: {},
          west: {},
          east: {}},
      texture: name + '_still',
      }],
    transparent: true,
    fluid: name,
    displayName: ucfirst(name) + ' Source',
    creativeTab: 'fluids'
  });

  var flow = this.registry.registerBlock(name + 'Flow', {
    texture: name + '_flow',
    blockModel: [
      {from: [0,0,0],
      to: [16,16,16],
      faceData: {
          down: {},
          up: {},
          north: {},
          south: {},
          west: {},
          east: {}},
      texture: name + '_flow',
      }],
    fluid: name,
    flowing: true,
    displayName: ucfirst(name) + ' Flow', // outflow effluent
    creativeTab: 'fluids'
  });
  // TODO: multiple blocks for different heights

  this.fluids[name] = {still:still, flow:flow};
};

FluidPlugin.prototype.getFluidNames = function() {
  return Object.keys(this.fluids);
};
