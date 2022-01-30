import { subtract, add, range, subset, norm, multiply, cross, index, divide, zeros, abs, inv, sqrt, cos, sin, pi, identity } from 'mathjs'
import {getModel} from './models'



export function calculate() {

    let model = getModel()
    let members = model.members
    let nodes = model.nodes
    let supports = model.supports
    for (let member in members){
        members[member].stiffness = getElementSpecs(members[member], nodes)
        // console.table(members.stiffness.Klocal_g)
    }
    let {n, r, f, transfMatrix} = transformMatrix(supports, nodes)
    
    let K_global = getK_global(members, nodes)
    let Kt = multiply(transfMatrix, multiply(K_global, inv(transfMatrix)))
    let Kff = subset(Kt, index(range(0,f),range(0,f))) 
    let Kfs = subset(Kt, index(range(0,f),range(f,n)))
    let Ksf = subset(Kt, index(range(f,n),range(0,f)))
    let Kss = subset(Kt, index(range(f,n),range(f,n)))

    // F1 = forceMatrix('G', sl)
    // F2 = forceMatrix('Q', sl)
    // Fall = yg*F1 + yq*F2
    let Fall = [0, 0, 0, 0, 0, 0, -20, 0, 0, 0, 0, 0, 0, 0, -20, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let Ft = multiply(transfMatrix,Fall)
    let Ff  = subset(Ft, index(range(0,f)))

    // dispMatrix = displacementMatrix()
    let dispMatrix = zeros([24])
    let Dt = multiply(transfMatrix, dispMatrix)
    let Ds = subset(Dt, index(range(f,n)))

    let Kffinv = inv(Kff)


    

    // try:
    //     Kffinv = np.linalg.inv(Kff)
    // except:
    //     Kffinv = np.linalg.pinv(Kff)
    //     print('! ! ! ! ! In forcematrix of analysis3dframe 251 the pinv was used instead of inv')
    
    // let Df = multiply(Kffinv, subtract(Ff, multiply(Kfs,Ds)))
    // let Fs = add(multiply(Ksf,Df), multiply(Kss,Ds))
    let Df = multiply(Kffinv, Ff)
    let Fs = multiply(Ksf,Df)

    let Fs1 = subset(Ft, index(range(f,n)))
    Fs = subtract(Fs, Fs1)

    console.log(Df)
    console.log(Fs)
    // 
    // DISPS = returnDisplacements(Df)
    // REACTS = returnReactions(Fs)
    // if thereΙsElasticNode():
    //     DISPS,REACTS = calculateElasticNode(DISPS, REACTS)
    // return DISPS,REACTS

}

function transformMatrix(sups, nods){
    let n = Object.keys(nods).length*6
    let supports = sups
    let T = identity([n,n])
    let transfMatrix = zeros([n,n])
    
    let allNodes = Object.keys(nods).sort()
    let supportNodes = Object.keys(supports)
    let restr = []
    for (let i=0; i<allNodes.length; i++) {
        if (supportNodes.includes(allNodes[i])) {
            for (let j=0; j<6; j++) {
                if (supports[allNodes[i]].restrains[j]==='R') {
                    restr.push(j+6*i+1)
                }
            }
        }       
    }
    let count = 0
    let r = restr.length
    let firstpos = n - r
    for (let f=0; f<n; f++) {
        if (!restr.includes(f+1)){
            transfMatrix[f-count]=T[f]
        }else{
            transfMatrix[firstpos+count] = T[f]
            count+=1
        }
        
    }
    let f = n-r
    return {n, r, f, transfMatrix}
}

function getElementSpecs(element, nodes) {
    let [A, E, G, Ix, Iy, Iz,v] = [0.125, 30000000, 12500000, 0.00179, 0.0026, 0.000651, 0]
    
    let start = nodes[element.start]
    let stop = nodes[element.stop]
    let theta = element.theta
    let L = beamLength(start, stop)

    let axes = localAxes(start, stop, theta)
    let {Klocal, Klocal_g} = stiffnessMatrix(L, A, E, G, Ix, Iy, Iz, v, axes)
    
    return {Klocal, Klocal_g}
}

function beamLength(start, stop) {
    let length = sqrt([(stop.x-start.x)**2 + (stop.y-start.y)**2 + (stop.z-start.z)**2])
    return length[0]
    // return length
}

function localAxes(start, stop, theta) {
    let vector = []
    let memberVector = []
    for (let i=0; i<3; i++) {
        vector.push(Object.values(stop)[i] - Object.values(start)[i]);
        memberVector = vector
    }
    let x_local = divide(memberVector, norm(memberVector));
    let reflectVector = [[-1,0,0],[0,-1,0],[0,0,1]];
    
    let uz  = multiply(memberVector, reflectVector);
    let y_local, z_local;
    if (vector[2]>0){
        if (vector[0]===0 & vector[1]===0){
            z_local = [-1,0,0]
            y_local = divide(cross(z_local, memberVector), norm(cross(memberVector,z_local)))
        }else{
            y_local = divide(cross(uz,memberVector), norm(cross(memberVector,uz)))
            z_local = divide(cross(memberVector,y_local), norm(cross(y_local,memberVector)))
        }
    }else if (vector[2]<0) {
        if (vector[0]===0 & vector[1]===0) {
            z_local = [1,0,0]
            y_local = divide(cross(z_local, memberVector), norm(cross(memberVector,z_local)))
        }else{
            y_local = divide(cross(memberVector,uz), norm(cross(uz,memberVector)))
            z_local = divide(cross(memberVector,y_local), norm(cross(y_local,memberVector)))
        }
    }else if (vector[2]===0) {
        z_local = [0,0,1]
        y_local = divide(cross(z_local, memberVector), norm(cross(memberVector,z_local)))
    }
    if (theta!==0) {
        let rot_x = rot_theta(x_local, theta)
        y_local = multiply(y_local, rot_x)
        z_local = multiply(z_local, rot_x)
    }
    return [x_local, y_local, z_local]
}

function rot_theta(axis, theta) {
    
        let x_axis = divide(axis, sqrt(multiply(axis, axis)))
        let a = cos((pi*theta/180)/2)

        x_axis = x_axis.map(l => l*(-1)*sin((pi*theta/180)/2))

        let [b, c, d] = x_axis
        return [[a*a+b*b-c*c-d*d, 2*(b*c-a*d), 2*(b*d+a*c)],
                [2*(b*c+a*d), a*a+c*c-b*b-d*d, 2*(c*d-a*b)],
                [2*(b*d-a*c), 2*(c*d+a*b), a*a+d*d-b*b-c*c]]
}




function rotationMatrix(axes) {
    // console.log(axes)
    for (let line=0; line<3; line++) {
        for (let value=0; value<3; value++) {
            if (abs(axes[line][value]) < 1e-8) {
                axes[line][value] = 0;
            }
        }
    }
    let rotMatrix = zeros([12,12])
    for (let count=0; count<10; count+=3) {
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                rotMatrix[i+count][j+count] = axes[i][j]
            }
        }
    }
    // console.table(rotMatrix)
    return {axes, rotMatrix}
}





export function stiffnessMatrix(L, A, E, G, Ix, Iy, Iz,v, axes) {
    // if (!G || G===0) {
    //     G=E/(2+2*v)
    // }
    let {rotMatrix} = rotationMatrix(axes)
    let rotationMatrix_transposed = inv(rotMatrix);
    let Klocal = zeros([12,12]);
    Klocal[0][0] = Klocal[6][6] = E*A/L
    Klocal[1][1] = Klocal[7][7] = 12*E*Iz/(L**3)
    Klocal[2][2] = Klocal[8][8] = 12*E*Iy/(L**3)
    Klocal[3][3] = Klocal[9][9] = G*Ix/L
    Klocal[4][4] = Klocal[10][10] = 4*E*Iy/L
    Klocal[5][5] = Klocal[11][11] = 4*E*Iz/L
    Klocal[1][5] = Klocal[5][1] = Klocal[1][11] = Klocal[11][1] = 6*E*Iz/(L**2)
    Klocal[7][11] = Klocal[11][7] = Klocal[5][7] = Klocal[7][5] = -6*E*Iz/(L**2)
    Klocal[4][8] = Klocal[8][4] = Klocal[8][10] = Klocal[10][8] = 6*E*Iy/(L**2)
    Klocal[2][4] = Klocal[4][2] = Klocal[2][10] = Klocal[10][2] = -6*E*Iy/(L**2)
    Klocal[0][6] = Klocal[6][0] = -Klocal[0][0]
    Klocal[1][7] = Klocal[7][1] = -Klocal[1][1]
    Klocal[2][8] = Klocal[8][2] = -Klocal[2][2]
    Klocal[3][9] = Klocal[9][3] = -Klocal[3][3]
    Klocal[4][10] = Klocal[10][4] = Klocal[4][4]/2
    Klocal[5][11] = Klocal[11][5] = Klocal[5][5]/2
    // console.table(rotMatrix)
    let Klocal_g = multiply(rotationMatrix_transposed,multiply(Klocal,rotMatrix))
    return {Klocal, Klocal_g}
}

function getK_global(beams, nodes) {

    // rotatedsupports = st.Beam.RotatedSupports
    // elasticnode = st.Beam.ElasticNode
    let n = Object.keys(nodes).length*6
    
    let Kall = zeros([n,n])
    let elementNames = Object.keys(beams).sort()//els
    
    let elementObjects=[]//el
    for (let i=0; i<elementNames.length; i++) {
        // console.log(beams[elementNames[i]])
        elementObjects.push(beams[elementNames[i]])
    }
    
    // for (let element in elementObjects) {
    for (let i=0; i<elementNames.length; i++) {
        let element = elementObjects[i]
        // console.log(elementObjects)
        // console.log(element.start)
        // console.log(element.stop)
        // console.log(element.stiffness)
        let start = element.start-1
        let stop = element.stop-1
        let Kel = element.stiffness.Klocal_g
        for (let i=0; i<6; i++) {
            for (let j=0; j<6; j++) {
                Kall[i+start*6][j+start*6] += Kel[i][j]
                Kall[i+start*6][j+stop*6] += Kel[i][j+6]
                Kall[i+stop*6][j+start*6] += Kel[i+6][j]
                Kall[i+stop*6][j+stop*6] += Kel[i+6][j+6]
            }
        }
            
    // if len(rotatedsupports)>0:
    //     for node, angles in rotatedsupports.items():
    //         rotv = supportRotationMatrix(node,angles)
    //         Kall = np.dot(np.linalg.inv(rotv),np.dot(Kall,rotv))
    // if len(elasticnode)>0:
    //     allnodes = sorted(nodes.keys(), key = lambda x: int(x[1:]))
    //     for node in allnodes:
    //         index = 6*(int(node[1:])-1)
    //         if node in elasticnode.keys():
    //             transfmatrix = st.elasticNode(node,elasticnode[node])
    //             for l in range(6):
    //                 Kall[index+l][index+l] += transfmatrix[l][l]
    }
    return Kall
}





// export function dispsReacts() {

//     let s = 7
//     let nodeslength = 4;
//     let f = nodeslength*6 - s
//     let K = K_global(beams)//<----------

//     //kanonika friaxnw oloklirous tous pinakes kai meta kovw ta tmimata pou xreiazomai
//     let Fall = [0, -20, 0, 0, 0, 0, 0, 0, -20, 0, 0, 0, 0, 0, 0, 0, 0]
//     Dmatrix = [0, 0, 0, 0, 0, 0 ,0]
//     Kt = np.dot(tM,np.dot(K,np.linalg.inv(tM)))
//     // Fall_t = np.dot(tM,Fall)
//     // Dt = np.dot(tM,Dmatrix)
    
//     Kff, Kfs, Ksf, Kss = Kt[:f,:f], Kt[:f,f:], Kt[f:,:f], Kt[f:,f:]

//     //cut only part of the matrices that we need
//     // Ff  = Fall_t[:f,]
//     // Fs1 = Fall_t[f:,]
//     // Ds = Dt[f:]

//     try:
//         Kffinv = np.linalg.inv(Kff)
//     except:
//         Kffinv = np.linalg.pinv(Kff)
//         print('! ! ! ! ! In forcematrix of analysis3dframe 251 the pinv was used instead of inv')
//     Df = np.dot(Kffinv,Ff-np.dot(Kfs,Ds))
//     Fs = np.dot(Ksf,Df) + np.dot(Kss,Ds)

//     Fs = Fs - Fs1

//     // console.log(Fs)
//     // console.log(Df)

// }

// function Kglobal() {

// }

// def dispsReacts(yg, yq, sl):
//     // if nodeContinuation() is False: renameAllNodes()
//     // beams = st.Beam.Beams
//     // for beam in beams.values():
//     //     beam.initValues(beam.theta)
//     nodes = st.Beam.Nodes
//     nodal_supps = st.Beam.NodalSupports
//     // s=0 # size 'supported' for the analysis of the matrices
//     // for value in nodal_supps.values():
//     //     for sup in value:
//     //         if sup==1:
//     //             s+=1
//     // f = len(nodes)*6 - s
//     K = K_global(beams)
//     tM = transformMatrix()
//     F1 = forceMatrix('G', sl)
//     F2 = forceMatrix('Q', sl)
//     Fall = yg*F1 + yq*F2
//     Dmatrix = displacementMatrix()
//     Kt = np.dot(tM,np.dot(K,np.linalg.inv(tM)))
//     Fall_t = np.dot(tM,Fall)
//     Dt = np.dot(tM,Dmatrix)
//     Kff, Kfs, Ksf, Kss = Kt[:f,:f], Kt[:f,f:], Kt[f:,:f], Kt[f:,f:]
//     Ff  = Fall_t[:f,]
//     Fs1 = Fall_t[f:,]
//     Ds = Dt[f:]
//     try:
//         Kffinv = np.linalg.inv(Kff)
//     except:
//         Kffinv = np.linalg.pinv(Kff)
//         print('! ! ! ! ! In forcematrix of analysis3dframe 251 the pinv was used instead of inv')
//     Df = np.dot(Kffinv,Ff-np.dot(Kfs,Ds))
//     Fs = np.dot(Ksf,Df) + np.dot(Kss,Ds)

//     Fs = Fs - Fs1

//     console.log(Fs)
//     console.log(Df)
//     // DISPS = returnDisplacements(Df)
//     // REACTS = returnReactions(Fs)
//     // return DISPS,REACTS


//     def K_global(beams):
//     '''Returns the stiffness matrix of the structure'''
//     nodes = st.Beam.Nodes
//     rotatedsupports = st.Beam.RotatedSupports
//     elasticnode = st.Beam.ElasticNode
//     n = len(nodes)*6
//     Kall = np.zeros(shape=(n,n))
//     els = sorted(beams.keys(), key = lambda x: int(x[2:]))
//     el=[]
//     for e in els:
//         el.append(beams[e])
//     for e in el:
//         start = int(e.start_node[1:])-1
//         stop = int(e.stop_node[1:])-1
//         Kel = e.K
//         for i in range(6):
//             for j in range(6):
//                 Kall[i+start*6][j+start*6] += Kel[i][j]
//                 Kall[i+start*6][j+stop*6] += Kel[i][j+6]
//                 Kall[i+stop*6][j+start*6] += Kel[i+6][j]
//                 Kall[i+stop*6][j+stop*6] += Kel[i+6][j+6]
//     if len(rotatedsupports)>0:
//         for node, angles in rotatedsupports.items():
//             rotv = supportRotationMatrix(node,angles)
//             Kall = np.dot(np.linalg.inv(rotv),np.dot(Kall,rotv))
//     if len(elasticnode)>0:
//         allnodes = sorted(nodes.keys(), key = lambda x: int(x[1:]))
//         for node in allnodes:
//             index = 6*(int(node[1:])-1)
//             if node in elasticnode.keys():
//                 transfmatrix = st.elasticNode(node,elasticnode[node])
//                 for l in range(6):
//                     Kall[index+l][index+l] += transfmatrix[l][l]
//     return Kall



//     def transformMatrix():
//     '''Returns the transformation matrix given the number of freedoms per node in general'''
//     supports = st.Beam.NodalSupports
//     n = len(st.Beam.Nodes)*6
//     T = np.identity(n)
//     transfMatrix = np.zeros(shape=(n,n))
//     keynodes = sorted(supports.keys(), key = lambda x: int(x[1:]))
//     numfreedom = []
//     for i, node in enumerate(keynodes):
//         for position, support in enumerate(supports[node]):
//             if support==1:
//                 numfreedom.append(position+6*i+1)
//     count = 0            
//     firstpos = n - len(numfreedom)
//     for f in range(n):
//         if f+1 not in numfreedom:
//             transfMatrix[f-count]=T[f]
//         else:
//             transfMatrix[firstpos+count] = T[f]
//             count+=1
//     return transfMatrix


//     def displacementMatrix():
//     nodes = st.Beam.Nodes
//     displacements = st.Beam.Displacements
//     n = len(nodes)*6
//     Dmatrix = np.zeros(shape=(n,1))
//     for node in sorted(nodes.keys(), key = lambda x: int(x[1:])):
//         if node in displacements.keys():
//             index = 6*(int(node[1:])-1)
//             for i in range(6): 
//                 Dmatrix[index+i] = displacements[node][i]
//     return Dmatrix


// function localAxes(start, stop, theta) {
//     let vector = []
//     let memberVector = []
//     for (let i=0; i<3; i++) {
//         vector.push(Object.values(stop)[i] - Object.values(start)[i]);
//         memberVector = vector
//     }
//     let x_local = divide(memberVector, norm(memberVector));
//     let reflectVector = [[-1,0,0],[0,-1,0],[0,0,1]];
    
//     let uz  = multiply(memberVector, reflectVector);
//     let y_local, z_local;
//     if (vector[2]>0){
//         if (vector[0]===0 & vector[1]===0){
//             z_local = [-1,0,0]
//             y_local = divide(cross(z_local,memberVector), norm(cross(memberVector,z_local)))
//         }else{
//             y_local = divide(cross(uz,memberVector), norm(cross(memberVector,uz)))
//             z_local = divide(cross(memberVector,y_local), norm(cross(y_local,memberVector)))
//         }
//     }else if (vector[2]<0) {
//         if (vector[0]===0 & vector[1]===0) {
//             z_local = [1,0,0]
//             y_local = divide(cross(z_local,memberVector), norm(cross(memberVector,z_local)))
//         }else{
//             y_local = divide(cross(memberVector,uz), norm(cross(uz,memberVector)))
//             z_local = divide(cross(memberVector,y_local), norm(cross(y_local,memberVector)))
//         }
//     }else if (vector[2]===0) {
//         z_local = [0,0,1]
//         y_local = divide(cross(z_local,memberVector), norm(cross(memberVector,z_local)))
//     }
//     if (theta!=0) {
//         let rot_x = rot_theta(x_local, theta)
//         y_local = multiply(y_local, rot_x)
//         z_local = multiply(z_local, rot_x)
//     }
// return [x_local, y_local, z_local]
// }