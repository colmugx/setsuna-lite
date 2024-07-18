/**
 * 会接收一个 json 文件
 * json 文件里面会包括两个对象：`jira` 和 `github`
 * 分别是对应 `engine` 所需要的配置
 */
export interface TConfig {
  jira: {
    host: string;
    email: string;
    token: string;
  };
  github: {
    token: string;
  };
}