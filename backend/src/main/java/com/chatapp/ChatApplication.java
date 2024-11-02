package com.chatapp;

import io.dropwizard.Application;
import io.dropwizard.setup.Environment;
import javax.servlet.ServletRegistration;

public class ChatApplication extends Application<ChatConfiguration> {
    public static void main(String[] args) throws Exception {
        new ChatApplication().run(args);
    }

    @Override
    public void run(ChatConfiguration configuration, Environment environment) {
        // Configure CORS
        environment.servlets().addFilter("CORS", new CORSFilter())
                .addMappingForUrlPatterns(null, true, "/*");

        // Add WebSocket endpoint
        final ServletRegistration.Dynamic websocket = environment.servlets().addServlet(
                "WebSocket Servlet",
                new ChatWebSocketServlet()
        );
        websocket.addMapping("/chat/*");
    }
}
