/**
 * Copyright reelyActive 2015-2020
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


/**
 * Process raw advertising packets into semantically meaningful information.
 * @param {Object} data The packet(s) as an array of, or as individual
 *                      hexadecimal-strings or Buffers.
 * @param {Array} processors The packet processor(s) to use, in order of
 *                priority.
 * @return {Object} The processed packets as JSON.
 */
function process(data, processors) {
  if(!data || !Array.isArray(processors) || (processors.length < 1)) {
    return null;
  }

  let packets = data;
  let processedPackets = {};
  let isSomeValidPacket = false;
  let isSinglePacket = !Array.isArray(data);

  if(isSinglePacket) {
    packets = [ data ];
  }

  packets.forEach(function(packet) {
    let processedPacket = invokeProcessors(packet, processors);
    if(processedPacket !== null) {
      isSomeValidPacket = true;
      Object.assign(processedPackets, processedPacket);  // TODO: smart merge
    }
  });
  
  if(isSomeValidPacket) {
    return processedPackets;
  }

  return null;
}


/**
 * Process raw advertising packets into semantically meaningful information.
 * @param {Object} data The packet as a hexadecimal-string or Buffer.
 * @param {Array} processors The packet processor(s) to use, in order of
 *                priority.
 * @return {Object} The processed packet as JSON.
 */
function invokeProcessors(data, processors) {
  for(let cProcessor = 0; cProcessor < processors.length; cProcessor++) {
    let processor = processors[cProcessor].processor;
    let libraries = processors[cProcessor].libraries;
    let isValidProcessor = utils.hasFunction(processor, 'process');

    if(isValidProcessor) {
      let processedPacket = processor.process(data, libraries);
      if(processedPacket !== null) {
        return processedPacket;
      }
    } 
  }

  return null;
}


module.exports.process = process;
