package org.acme.ssm;

import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import software.amazon.awssdk.services.ssm.SsmClient;

@Path("/sync")
public class QuarkusSsmSyncResource extends QuarkusSsmResource {

    @Inject
    SsmClient ssm;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, String> getParameters() {
        return ssm.getParametersByPath(generateGetParametersByPathRequest())
                .parameters().stream().collect(parametersToMap());
    }

    @PUT
    @Path("/{name}")
    @Consumes(MediaType.TEXT_PLAIN)
    public void setParameter(@PathParam("name") String name,
            @QueryParam("secure") @DefaultValue("false") boolean secure,
            String value) {

        ssm.putParameter(generatePutParameterRequest(name, value, secure));
    }

    @GET
    @Path("/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getParameter(@PathParam("name") String name) {
        return ssm.getParameter(generateGetParameterRequest(name))
                .parameter().value();
    }
}