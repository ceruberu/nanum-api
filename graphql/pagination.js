const Pagination = `
  type itemEdge {
    cursor: Cursor
    node: Item
  }

  type pageInfo {
    endCursor: Cursor
    hasNextPage: Boolean
  }

  type mainQuery {
    edges: [itemEdge]
    pageInfo: pageInfo
  }
`;

export default Pagination;