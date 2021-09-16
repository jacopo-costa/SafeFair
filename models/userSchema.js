class userSchema {
    constructor(nome, email, password, posizione, tipo, tag) {
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.posizione = posizione;
        this.tipo = tipo;
        this.tag = tag;
    }
}

module.exports = userSchema;