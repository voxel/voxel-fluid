'use strict';

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


var ucfirst = function(s) {
  return s.substr(0, 1).toUpperCase() + s.substring(1);
};

FluidPlugin.prototype.registerFluid = function(name) {
  var still = this.registry.registerBlock(name, {
    texture: name + '_still',
    fluid: name,
    displayName: ucfirst(name) + ' Source'
  });

  var flow = this.registry.registerBlock(name + 'Flow', {
    texture: name + '_flow',
    fluid: name,
    flowing: true,
    displayName: ucfirst(name) + ' Flow' // outflow effluent
  });
  // TODO: multiple blocks for different heights

  this.fluids[name] = {still:still, flow:flow};
};

FluidPlugin.prototype.getFluidNames = function() {
  return Object.keys(this.fluids);
};
