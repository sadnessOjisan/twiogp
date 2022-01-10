import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";

const IndexPage: React.VFC<PageProps<GatsbyTypes.AllConfigQuery>> = ({
  data,
}) => {
  return (
    <main>
      {data.allConfigYaml.edges.map((edge) => (
        <Link key={edge.node.id} to={`/${edge.node.path}`}>
          {edge.node.name}
        </Link>
      ))}
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  query AllConfig {
    allConfigYaml {
      edges {
        node {
          id
          path
          name
        }
      }
    }
  }
`;
