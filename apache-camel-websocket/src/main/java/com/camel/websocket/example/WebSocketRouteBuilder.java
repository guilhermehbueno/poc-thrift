package com.camel.websocket.example;

import org.apache.camel.builder.RouteBuilder;

public class WebSocketRouteBuilder extends RouteBuilder{
	
	@Override
	public void configure() throws Exception {
		from("websocket:my-socket")
		    .process(new RuleProcessor()).end();
		//from("jetty://http://localhost:8182/hello").process(new RuleProcessor()).end();
	}
}