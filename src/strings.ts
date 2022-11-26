export const AppStrings = {
  // Common strings

  Home: {
    repositoryCards: {
      sharedRepository: " compartilhou um ",
      post: "post",
      createdAt: "Criado {{date}}",
      updatedAt: "Atualizado {{date}}",
    },
    postsRecommendations: {
      title: "Explore outros repositórios",
      exploreMore: "Explore mais",
    },
    sideMenu: {
      repositories: "Meus repositórios",
      friends: "Amigos",
      groups: "Grupos",
      marketplace: "Marketplace",
    },
  },

  Login: {
    title: "Compartilhe seus conhecimentos com o mundo!",
    subtitle: "Conheça e explore a didática do seu jeito",
    fields: {
      email: "Email*",
      password: "Senha*",
    },
    fieldsRequirements: {
      requiredEmail: "Email obrigatório",
      validEmail: "Precisa ser um email válido",
      requiredPassword: "Senha obrigatória",
      validPassword: "Senha precisa ter no mínimo 6 caracteres",
    },
    forgotPassword: "Esqueci minha senha",
    button: "Entrar",
    buttonSecondary: "Criar nova conta",
  },

  SignUp: {
    title: "Cadastre-se",
    fields: {
      name: "Nome*",
      lastName: "Sobrenome*",
      username: "Username*",
      email: "Email*",
      password: "Senha*",
    },
    fieldsRequirements: {
      requiredName: "Nome obrigatório",
      requiredLastName: "Sobrenome obrigatório",
      requiredUsername: "Username obrigatório",
      requiredEmail: "Email obrigatório",
      validEmail: "Precisa ser um email válido",
      requiredPassword: "Senha obrigatória",
      validPassword: "Senha precisa ter no mínimo 6 caracteres",
    },
    termsMessage: {
      onSignUp: "Ao clicar em Cadastrar-se, você concorda com nossos",
      terms: "Termos,",
      privacyPolicy: "Política de Privacidade",
      and: "e",
      cookiesPolicy: "Política de Cookies",
      changePolicies:
        ". Você poderá receber notificações por SMS e cancelar isso quando quiser.",
    },
    button: "Cadastrar-se",
  },

  Profile: {
    myRepositories: "Repositórios",
    profileRequirements: {
      requiredName: "Nome obrigatório",
      requiredEmail: "Email obrigatório",
      validEmail: "Precisa ser um email válido",
      requiredPassword: "Senha obrigatória",
      validPassword: "Senha precisa ter no mínimo 6 caracteres",
    },
    profilePlaceholder: {
      name: "Seu nome",
      description: "Sua descrição",
      career: "Sua profissão",
      city: "Sua cidade",
      state: "Seu estado",
      country: "Seu país",
    },
  },

  Repository: {
    createdAt: "Criado {{date}}",
    updatedAt: "Atualizado {{date}}",
    description: {
      editButton: "Editar",
    },
    create: {
      requiredTitle: "Título obrigatório",
      fields: {
        title: "Título",
        description: "Descrição",
      },
      createButton: "Criar",
    },
    edit: {
      requiredTitle: "Título obrigatório",
      fields: {
        title: "Título",
        description: "Descrição",
      },
      editButton: "Salvar",
      deleteButton: "Deletar",
      onDelete: {
        deleteConfirmation: "Deseja mesmo deletar sua conta?",
        confirmationWarning:
          "Todos os seus repositórios, posts e contribuições para a comunidade serão deletados, tem certeza que deseja continuar?",
        declineButton: "Não deletar",
        deleteButton: "Deletar",
      },
    },
  },
};

export function replaceTemplateString(
  templateString: string,
  replacements: Record<string, string | number> = {}
) {
  const replacedStrings = templateString;

  if (!replacements || !templateString) {
    return null;
  }

  return Object.entries(replacements).reduce(
    (result, [key, value]) => result.replace(`{{${key}}}`, value.toString()),
    replacedStrings
  );
}
