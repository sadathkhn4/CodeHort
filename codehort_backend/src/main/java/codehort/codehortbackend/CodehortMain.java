package codehort.codehortbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodehortMain {

	public static void main(String[] args) {
		SpringApplication.run(CodehortMain.class, args);
		System.out.println("welcome to spring boot");
	}

}