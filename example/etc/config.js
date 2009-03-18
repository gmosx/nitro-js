$DEBUG = true;

CONFIG = {
    paths: {
        nitro: "/home/gmosx/u/nitro",
        jack: "/home/gmosx/u/jack",
    },
    database: {
        system: "mysql",
        host: "localhost",
        name: "blog",
        user: "nitro",
        password: "p@ssw0rd"
    },
    jack: {
        handler: "simple"
    },
    session: {
        secret: "s3cr3t"
    }
}
