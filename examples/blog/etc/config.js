$DEBUG = true;

CONFIG = {
    paths: {
        nitro: "/home/gmosx/u/nitro"
    },
    database: {
        type: "relational",
        system: "mysql",
        host: "localhost",
        name: "blog",
        user: "nitro",
        password: "p@ssw0rd"
    },
    jack: {
        handler: "simple",
        host: "0.0.0.0",
        port: 8080
    },
    session: {
        secret: "s3cr3t"
    },
    mailer: {
    	protocol: "smtp",
    	host: "smtp.gmail.com",
    	port: 465,
    	username: "george.moschovitis@gmail.com",
    	password: "xxxxxx"
    }    
}
