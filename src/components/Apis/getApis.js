const getApis = options => {
  const { prefix } = Object.assign(
    {},
    {
      prefix: '/api'
    },
    options
  );

  return {
    community: {
      getList: {
        loader: () => {
          return {
            totalCount: 0,
            pageData: []
          };
        }
      },
      create: {}
    }
  };
};

export default getApis;
