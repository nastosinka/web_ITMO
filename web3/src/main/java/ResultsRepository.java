import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;


@ApplicationScoped
@Named("resultRepository")
public class ResultsRepository implements Serializable {
    @Inject
    private SessionFactory sessionFactory;
    private List<Result> results;

    @PostConstruct
    private void init() {
        results = loadData();
    }


    public List<Result> getResultsList() {
        return results;
    }

    public String getResultsListAsJson() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        try {
            return mapper.writeValueAsString(results);
        } catch (Exception e) {
            e.printStackTrace();
            return "[]";
        }
    }

    public void addResult(Result result) {
        Transaction tx = null;
        try (Session session = sessionFactory.openSession()) {
            tx = session.beginTransaction();
            session.persist(result);
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw new RuntimeException("Error adding result", e);
        }
        this.results.add(result);
    }

    public void refreshResults() {
        this.results = loadData();
    }

    public List<Result> loadData() {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        List<Result> results;
        try {
            tx = session.beginTransaction();
            results = session.createQuery("from Result", Result.class).getResultList();
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw new RuntimeException("Error while adding result", e);
        } finally {
            session.close();
        }
        return results;
    }

    public void removeResults() {
        Transaction tx = null;
        try (Session session = sessionFactory.openSession()) {
            tx = session.beginTransaction();
            session.createQuery("delete from Result").executeUpdate();
            tx.commit();
            results.clear();
            System.out.println("data deleted successfully");
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw new RuntimeException(e);
        }
    }
}


