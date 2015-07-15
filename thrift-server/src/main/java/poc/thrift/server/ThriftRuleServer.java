package poc.thrift.server;

import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TServer.Args;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TServerTransport;
import org.apache.thrift.transport.TTransportException;

import tutorial.Calculator;

public class ThriftRuleServer {

	public static void main(String[] args) {
		try {
			TServerTransport transport;
			transport = new TServerSocket(3101);
			CalculatorHandler handler = new CalculatorHandler();
			Calculator.Processor<CalculatorHandler> processor = new Calculator.Processor<CalculatorHandler>(
					handler);
			final TServer server = new TSimpleServer(
					new Args(transport).processor(processor));
			Thread t = new Thread(new Runnable() {

				@Override
				public void run() {
					server.serve();
				}
			});
			t.start();
		} catch (TTransportException e) {
			e.printStackTrace();
		}
	}

}
