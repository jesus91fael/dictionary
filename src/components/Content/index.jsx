export const Content = (props) => {
  return (
    <main>
      <h2>{props?.word}</h2>

      {props.keyWord &&
        props.keyWord.map((element, index) => {
          return (
            <dl key={index}>
              <dt>
                <h4>Classe Gramatical</h4>
              </dt>
              <dd>{element?.partOfSpeech}</dd>
              <dt>
                <h4>Significado</h4>
              </dt>
              {element?.meanings.map((value, index) => {
                return <dd key={index}>{value}</dd>;
              })}
              <dt>
                <h4>Etimologia</h4>
              </dt>
              <dd>{element.etymology}</dd>
            </dl>
          );
        })}
    </main>
  );
};
