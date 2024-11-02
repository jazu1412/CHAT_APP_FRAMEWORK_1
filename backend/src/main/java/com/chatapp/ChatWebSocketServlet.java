package com.chatapp;

import org.eclipse.jetty.websocket.servlet.WebSocketServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

public class ChatWebSocketServlet extends WebSocketServlet {
    private static final long serialVersionUID = 1L;

    @Override
    public void configure(WebSocketServletFactory factory) {
        // Set a longer idle timeout (5 minutes)
        factory.getPolicy().setIdleTimeout(300000);
        // Increase message size limit
        factory.getPolicy().setMaxTextMessageSize(65535);
        factory.setCreator((req, resp) -> new ChatWebSocket());
    }
}
