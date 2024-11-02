package com.chatapp;

import io.dropwizard.Configuration;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatConfiguration extends Configuration {
    @JsonProperty
    private int websocketPort = 8080;

    public int getWebsocketPort() {
        return websocketPort;
    }
}
