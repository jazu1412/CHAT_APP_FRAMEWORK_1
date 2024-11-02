package com.chatapp;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ChatWebSocket extends WebSocketAdapter {
    private static final Map<Session, String> SESSIONS = new ConcurrentHashMap<>();
    private static int userCounter = 0;

    @Override
    public void onWebSocketConnect(Session session) {
        super.onWebSocketConnect(session);
        String userId = "User" + (++userCounter);
        SESSIONS.put(session, userId);
        System.out.println("Socket Connected: " + userId);
    }

    @Override
    public void onWebSocketText(String message) {
        Session senderSession = getSession();
        String senderId = SESSIONS.get(senderSession);
        
        // Send to other sessions only (not back to sender)
        SESSIONS.forEach((session, userId) -> {
            if (session.isOpen() && session != senderSession) {
                try {
                    // Replace "You" with the actual sender's ID for other users
                    String modifiedMessage = message.replace("\"You\"", "\"" + senderId + "\"");
                    session.getRemote().sendString(modifiedMessage);
                } catch (IOException e) {
                    e.printStackTrace();
                    try {
                        session.close();
                    } catch (Exception closeError) {
                        closeError.printStackTrace();
                    }
                }
            }
        });
    }

    @Override
    public void onWebSocketClose(int statusCode, String reason) {
        Session session = getSession();
        String userId = SESSIONS.remove(session);
        System.out.println("Socket Closed: " + userId);
        super.onWebSocketClose(statusCode, reason);
    }

    @Override
    public void onWebSocketError(Throwable cause) {
        Session session = getSession();
        SESSIONS.remove(session);
        System.err.println("WebSocket Error: " + cause.getMessage());
        cause.printStackTrace();
        super.onWebSocketError(cause);
    }
}
