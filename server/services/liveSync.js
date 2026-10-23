/**
 * Agro Dairy Export - Server-Sent Events (SSE) Live Synchronization Service
 * Broadcasts real-time events to all connected clients when admin updates CMS content
 */

const clients = new Set();

/**
 * Handle new client SSE connection
 */
function handleSSEConnection(req, res) {
  // Set SSE response headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'X-Accel-Buffering': 'no', // Disable proxy buffering (e.g. Nginx)
  });

  // Send initial handshake
  const initialData = JSON.stringify({
    type: 'CONNECTED',
    message: 'Agro Dairy Live Sync Active',
    timestamp: Date.now(),
    clients: clients.size + 1,
  });
  res.write(`data: ${initialData}\n\n`);

  // Add to active subscribers set
  clients.add(res);

  // Keep-alive heartbeat every 25 seconds to prevent timeout
  const heartbeat = setInterval(() => {
    try {
      res.write(': keepalive\n\n');
    } catch (e) {
      clearInterval(heartbeat);
      clients.delete(res);
    }
  }, 25000);

  // Cleanup on client disconnect
  req.on('close', () => {
    clearInterval(heartbeat);
    clients.delete(res);
  });
}

/**
 * Broadcast an event to all connected clients
 * @param {string} eventType - e.g. 'SETTINGS_UPDATED', 'COMMODITIES_UPDATED', 'GALLERY_UPDATED', 'FAQS_UPDATED'
 * @param {object} payload - optional event metadata
 */
function broadcastLiveEvent(eventType, payload = {}) {
  const data = JSON.stringify({
    type: eventType,
    payload,
    timestamp: Date.now(),
    clientCount: clients.size,
  });

  const message = `event: ${eventType}\ndata: ${data}\n\n`;

  for (const client of clients) {
    try {
      client.write(message);
    } catch (err) {
      clients.delete(client);
    }
  }

  return clients.size;
}

/**
 * Get active connection count
 */
function getActiveClientCount() {
  return clients.size;
}

module.exports = {
  handleSSEConnection,
  broadcastLiveEvent,
  getActiveClientCount,
};
