package poc.thrift;

import poc.thrift.server.ThriftRuleServer;

public class ABRulesApplication {
	public static void main(String[] args) {
		System.out.println("A");
		for (String string : args) {
			System.out.println(string);
		}
		ThriftRuleServer.main(args);
	}
}
