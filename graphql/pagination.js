const Pagination = `
  type itemEdge {
    cursor: Cursor
    node: Item
  }

  type pageInfo {
    endCursor: Cursor
    hasNextPage: Boolean
  }

  type itemFeed {
    edges: [itemEdge]
    pageInfo: pageInfo
  }
`;

export default Pagination;