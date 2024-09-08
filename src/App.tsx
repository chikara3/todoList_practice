import { useState } from 'react';

//'Todo型'の定義
type Todo = {
  //プロパティはvalueは文字列型
  value: string;
  readonly id: number; //readonly(読み取り専用)
  checked: boolean;
  removed: boolean;
};

export const App = () => {
  //初期値: 空文字''
  const [text, setText] = useState('');
  //タスクを複数保持するステートの作成
  //初期値はからの配列
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  //todosステートを更新する関数(イベントハンドラー)
  const handleSubmit = () => {
    if (!text) return;

    //新しいTodoを作成
    const newTodo: Todo = {
      //textステートの値をvalueプロパティへ
      value: text,
      /**Todo型オブジェクトの型定義が更新されたため、
       * number型のidプロパティの存在が必須になった
       */
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    //[](配列)の先頭にnewTodoを追加した新たな配列を作成している
    setTodos((todos) => [newTodo, ...todos]);
    //フォームの入力をクリアにする
    setText('');
  };

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value };
        }
        return todo;
      });

      // todos ステートを更新
      return newTodos;
    });
  };

  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, removed };
        }
        return todo;
      });

      return newTodos;
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="submit"
          value="追加"
          onSubmit={handleSubmit}
        />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                //呼び出し側でcheckedフラグを反転させる
                onChange={() => handleCheck(todo.id, !todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleRemove(todo.id, !todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
