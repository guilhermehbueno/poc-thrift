package com.camel.websocket.example.main;

import org.apache.camel.CamelContext;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.websocket.WebsocketComponent;
import org.apache.camel.impl.DefaultCamelContext;

import com.camel.websocket.example.RuleProcessor;

public class Main {

	public static void main(String[] args) {
		System.out.println("Starting websocket server with apache camel");
		try {
			//ApplicationContext context = new ClassPathXmlApplicationContext("spring-camel-context.xml");
			
			 CamelContext context = new DefaultCamelContext();
			    WebsocketComponent wc = context.getComponent("websocket", WebsocketComponent.class);
			    wc.setPort(8081);
			    // serve static resources
			    wc.setStaticResources("classpath:.");

			    RouteBuilder routes = new RouteBuilder() {
			      public void configure() {
			        from("websocket:my-socket").log(">>> Message received from WebSocket Client : ${body}")
			        .process(new RuleProcessor())
			        .transform().simple("${body}")
			        .to("websocket:my-socket");
			      }
			    };

			    context.addRoutes(routes);
			    context.start();
			
			while (true) {
				System.out.println("Sleeping");
				Thread.sleep(10000);
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}