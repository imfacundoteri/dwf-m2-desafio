import * as minimist from "minimist";
import { PelisController } from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function result(controller, params) {
  if (params._[0] == "add") {
    return controller.add({ id: params.id, title: params.title, tags: params.tags }).then((res) => { return res })
  } else if (params._[0] == "get") {
    return controller.get({ id: params._[1] }).then((res) => { return res })
  } else if (params._[0] == "search" && params.title && params.tag) {
    return controller.get({ search: { title: params.title, tag: params.tag } }).then((res) => { return res })
  } else if (params._[0] == "search" && params.title) {
    return controller.get({ search: { title: params.title } }).then((res) => { return res })
  } else if (params._[0] == "search" && params.tag) {
    return controller.get({ search: { tag: params.tag } }).then((res) => { return res })
  } else if ({}) {
    return controller.get({}).then((res) => { return res })
  }
}

function main() {
  const controller = new PelisController()
  const params = parseaParams(process.argv.slice(2));
  const finalResult = result(controller, params)
  finalResult.then((res) => { console.log(res) })
}

main();
