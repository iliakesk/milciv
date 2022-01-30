export function getModel(){
    return {
        nodes: {
          '1': {
            x: '0',
            y: '0',
            z: '0'
          },
          '2': {
            x: '0',
            y: '0',
            z: '4'
          },
          '3': {
            x: '0',
            y: '4',
            z: '4'
          },
          '4': {
            x: '-4',
            y: '4',
            z: '8'
          }
        },
        members: {
            '1': {
                start: '1',
                stop: '2',
                theta: 0
            },
            '2': {
                start: '2',
                stop: '3',
                theta: 135
            },
            '3': {
                start: '3',
                stop: '4',
                theta: 90
            }
        },
        supports: {
          '1': {
            restrains: 'RRRRRR',
            spring_supports: {
              x: '',
              y: '',
              z: '',
              rx: '',
              ry: '',
              rz: ''
            },
            displacements: {
              tx: '',
              ty: '',
              tz: '',
              rx: '',
              ry: '',
              rz: ''
            }
          },
          '4': {
            restrains: 'FFRFFF',
            spring_supports: {
              x: '',
              y: '',
              z: '',
              rx: '',
              ry: '',
              rz: ''
            },
            displacements: {
              tx: '',
              ty: '',
              tz: '',
              rx: '',
              ry: '',
              rz: ''
            }
          }
        }
      }



}

// export function calculate() {

//     let model = getModel()
//     let members = model.members
//     let nodes = model.nodes
//     let supports = model.supports
//     for (let member in members){
//         members[member].stiffness = getElementSpecs(members[member], nodes)
//         // console.table(members.stiffness.Klocal_g)
//     }
//     let {n, r, f, transformationMatrix} = transformMatrix(supports, nodes)
    
//     let K_global = getK_global(members, nodes)
//     let Kt = multiply(transformationMatrix, multiply(K_global, inv(transformationMatrix)))
//     let Kff = subset(Kt, index(range(0,f),range(0,f))) //OK se sxesi me apotelesmata
//     let Kfs = subset(Kt, index(range(0,f),range(f,n))) //OK se sxesi me apotelesmata
//     let Ksf = subset(Kt, index(range(f,n),range(0,f))) //OK se sxesi me apotelesmata
//     let Kss = subset(Kt, index(range(f,n),range(f,n))) //OK se sxesi me apotelesmata
//     let Kffinv = inv(Kff)

//     // F1 = forceMatrix('G', sl)
//     // F2 = forceMatrix('Q', sl)
//     // Fall = yg*F1 + yq*F2
//     let Fall = [0, 0, 0, 0, 0, 0, 0, -20, 0, 0, 0, 0, 0, 0, -20, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     let Ft = multiply(transformationMatrix,Fall)
//     let Ff  = subset(Ft, index(range(0,f))) //OK se sxesi me apotelesmata

//     // dispMatrix = displacementMatrix()
//     let dispMatrix = zeros([24])
//     let Dt = multiply(transformationMatrix, dispMatrix)
//     let Ds = subset(Dt, index(range(f,n)))

    
//     console.table(Kffinv)
    

//     // try:
//     //     Kffinv = np.linalg.inv(Kff)
//     // except:
//     //     Kffinv = np.linalg.pinv(Kff)
//     //     print('! ! ! ! ! In forcematrix of analysis3dframe 251 the pinv was used instead of inv')
    
//     let Df = multiply(Kffinv, subtract(Ff, multiply(Kfs,Ds)))
//     let Fs = add(multiply(Ksf,Df), multiply(Kss,Ds))
//     // let Df = multiply(Kffinv, Ff)
//     // let Fs = multiply(Ksf,Df)

//     let Fs1 = subset(Ft, index(range(f,n)))
//     Fs = subtract(Fs, Fs1)

//     // console.log(Df)
//     // console.log(Fs)
//     // 
//     // DISPS = returnDisplacements(Df)
//     // REACTS = returnReactions(Fs)
//     // if thereΙsElasticNode():
//     //     DISPS,REACTS = calculateElasticNode(DISPS, REACTS)
//     // return DISPS,REACTS

// }