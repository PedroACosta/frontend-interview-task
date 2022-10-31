import { useEffect } from "react";
import { Status, useJobsQuery } from "../../generated/graphql";
import { Card } from "./Card";
import { Column } from "./Column";

import styles from "./styles.module.css";

export function Index() {
  const { data, loading } = useJobsQuery({ pollInterval: 1000 });

  if (!data && loading) {
    return <div>…</div>;
  }

  if (!data) {
    return <div>Something went wrong :(</div>;
  }

  return (
    <div className={styles.container}>
      <Column>
        <h2 className={styles.title}>To do</h2>
        {data.jobs
          .filter((it) => it.status === Status.ToDo)
          .map((it) => (
            <Card {...it} key={it.id} />
          ))}
      </Column>
      <Column>
        <h2 className={styles.title}>In progress</h2>
        {data.jobs
          .filter((it) => it.status === Status.InProgress)
          .map((it) => (
            <Card {...it} key={it.id} />
          ))}
      </Column>
      <Column>
        <h2 className={styles.title}>Done</h2>
        {data.jobs
          .filter((it) => it.status === Status.Done)
          .map((it) => (
            <Card {...it} key={it.id} />
          ))}
      </Column>
    </div>
  );
}
