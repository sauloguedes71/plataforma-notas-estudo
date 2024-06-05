import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export class Usuario {
    constructor(email, nome, senha, permissao){
        this.email = email
        this.nome = nome 
        this.senha = senha
        this.permissao = permissao      
    }

  async login(email, senha) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: {
          email: email,
          senha: senha
        },
        select: {
          email: true,
          nome: true,
          permissao: true
        }
      });

      if (usuario) {
        console.log("Login bem-sucedido!");
        return usuario;
      } else {
        console.log("Nome de usuário ou senha incorretos.");
        throw new Error("Nome de usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error('Erro ao consultar:', error);
      throw error;
    }
  }
}


